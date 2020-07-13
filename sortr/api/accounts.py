import flask
import sortr
import hashlib
import uuid
import sqlite3


def check_password(username, password):
    """Return true if the provided password matches username's."""
    connection = sortr.model.get_db()
    cur = connection.execute(
        "SELECT PasswordHash "
        "FROM Users "
        "WHERE Username = ? ",
        (username,)
    )
    db_password = cur.fetchone()
    if db_password is not None:
        db_password = db_password["PasswordHash"]
        salt = db_password.split("$")[1]
        hashed_password = hash_password(password, salt)
        check_cur = connection.execute(
            "SELECT 1 "
            "FROM Users "
            "WHERE Username = ? "
            "AND PasswordHash = ?",
            (username, hashed_password)
        )
        if check_cur.fetchone() is not None:
            return True
        # endIf
    # endIf
    return False


def hash_password(password, salt=None):
    """Create sha512 hash of password with salt."""
    if salt is None:
        salt = uuid.uuid4().hex
    algorithm = 'sha512'
    hash_obj = hashlib.new(algorithm)
    password_salted = salt + password
    hash_obj.update(password_salted.encode('utf-8'))
    password_hash = hash_obj.hexdigest()
    return "$".join([algorithm, salt, password_hash])
# hash_password()


@sortr.app.route('/api/v1/accounts/create', methods=['POST'])
def create_account():
    con = sortr.model.get_db()

    username = flask.request.json["username"]
    email = flask.request.json["email"]
    password = flask.request.json["password"]

    try:
        con.execute(
            "INSERT INTO Users(" +
            "Username, Email, PasswordHash) " + 
            "VALUES(?, ?, ?)",
            (username, email, hash_password(password))
        )
    except sqlite3.Error as err:
        return flask.abort(400)

    flask.session["login"] = {
        "username": username,
        "filename": "/static/assets/default_profile_pic.png"
    }

    return "Created", 201


@sortr.app.route('/api/v1/accounts/login', methods=['POST'])
def login():
    con = sortr.model.get_db()

    username = flask.request.json["username"]
    password = flask.request.json["password"]

    if check_password(username, password):
        flask.session["login"] = {
            "username": username,
            "filename": "/static/assets/default_profile_pic.png"
        }

        return "Success", 200

    return "Unauthorized", 403


@sortr.app.route('/api/v1/accounts/authenticate', methods=['GET'])
def authenticate():
    res = {
        "authenticated": False,
        "data": None
    }

    login_info = flask.session['login']
    if login_info is not None:
        res.update({
            "authenticated": True,
            "data": login_info
        })

    return flask.jsonify(**res)


@sortr.app.route('/api/v1/accounts/signout', methods=['POST'])
def sign_out():
    flask.session['login'] = None
     
    return "Success", 200