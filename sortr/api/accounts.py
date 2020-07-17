import flask
import sortr
import boto3
import hashlib
import uuid
import sqlite3


def check_password(username, password):
    '''Return true if the provided password matches username's.'''
    dynamodb = boto3.resource('dynamodb')
    users = dynamodb.Table('users')

    user_obj = users.get_item(
        Key={
            'username': username
        }
    )

    item = user_obj.get('Item')
    print(item)

    if item is not None:
        db_password = item['passwordHash']
        salt = db_password.split('$')[1]
        hashed_password = hash_password(password, salt)
        if db_password == hashed_password:
            return True
        # endIf
    # endIf
    return False


def hash_password(password, salt=None):
    '''Create sha512 hash of password with salt.'''
    if salt is None:
        salt = uuid.uuid4().hex
    algorithm = 'sha512'
    hash_obj = hashlib.new(algorithm)
    password_salted = salt + password
    hash_obj.update(password_salted.encode('utf-8'))
    password_hash = hash_obj.hexdigest()
    return '$'.join([algorithm, salt, password_hash])
# hash_password()


@sortr.app.route('/api/v1/accounts/create', methods=['POST'])
def create_account():
    username = flask.request.json['username']
    email = flask.request.json['email']
    password = flask.request.json['password']

    dynamodb = boto3.resource('dynamodb')
    users = dynamodb.Table('users')

    users.put_item(
        Item={
            'username': username,
            'email': email,
            'passwordHash': hash_password(password)
        }
    )

    flask.session['login'] = {
        'username': username,
        'filename': '/static/assets/default_profile_pic.png'
    }

    return 'Created', 201


@sortr.app.route('/api/v1/accounts/login', methods=['POST'])
def login():
    username = flask.request.json['username']
    password = flask.request.json['password']

    if check_password(username, password):
        flask.session['login'] = {
            'username': username,
            'filename': '/static/assets/default_profile_pic.png'
        }

        return 'Success', 200

    return 'Unauthorized', 403


@sortr.app.route('/api/v1/accounts/authenticate', methods=['GET'])
def authenticate():
    res = {
        'authenticated': False,
        'data': None
    }

    if 'login' in flask.session:
        res.update({
            'authenticated': True,
            'data': flask.session['login']
        })

    return flask.jsonify(**res)


@sortr.app.route('/api/v1/accounts/signout', methods=['POST'])
def sign_out():
    flask.session.pop('login')
     
    return 'Success', 200