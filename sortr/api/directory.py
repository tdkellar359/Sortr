import flask
import sortr
import os
import base64
import binascii


"""
Query Parameters:
    page:   The page of results to get (default = 0)

    n:      Maximum number of each folders to
            return (default = 20)

Return:
    {
        url: string,
        results: [
            {
                name: string,
                url: string
            },
            ...
        ] | null,
        next: string | null
    }
"""
@sortr.app.route('/api/v1/directory/folders/<path:path_hash>')
def get_folders(path_hash):
    # TODO: Get username
    username = "admin"

    res = {
        "url": flask.request.path,
        "results": [],
        "next": "",
        "message": "success"
    }

    try:
        subpath = base64.urlsafe_b64decode(path_hash).decode('utf-8')
        subpath = subpath.replace("home", username, 1)
        user_path = os.path.join(
            sortr.app.config["DIRECTORY_ROOT"],
            subpath
        )
    except binascii.Error as err:
        res["message"] = "The file path was not specified correctly."
        return flask.jsonify(**res), 400

    try:
        res["results"] = [
            { "name": folder, "path": os.path.join(user_path, folder) }
            for folder
            in os.listdir(user_path)
            if os.path.isdir(os.path.join(user_path, folder))
        ]
    except FileNotFoundError as err:
        res["message"] = err.strerror
        return flask.jsonify(**res), 404

    print(res)

    return flask.jsonify(**res)


"""
Query Parameters:
    page:   The page of results to get (default = 0)

    n:      Maximum number of each folders to
            return (default = 20)

Return:
    {
        url: string,
        results: [
            {
                name: string,
                url: string
            },
            ...
        ] | null,
        next: string | null
    }
"""
@sortr.app.route('/api/v1/directory/files/<path:path_hash>')
def get_files(path_hash):
    username = "admin"

    res = {
        "url": flask.request.path,
        "results": [],
        "next": "",
        "message": "success"
    }

    try:
        subpath = base64.urlsafe_b64decode(path_hash).decode('utf-8')
        subpath = subpath.replace("home", username, 1)
        user_path = os.path.join(
            sortr.app.config["DIRECTORY_ROOT"],
            subpath
        )
    except binascii.Error as err:
        res["message"] = "The file path was not specified correctly."
        return flask.jsonify(**res), 400

    try:
        res["results"] = [
            { "name": file, "path": os.path.join(user_path, file) }
            for file
            in os.listdir(user_path)
            if os.path.isfile(os.path.join(user_path, file))
        ]
    except FileNotFoundError as err:
        res["message"] = "The requested path was not found."
        return flask.jsonify(**res), 404

    return flask.jsonify(**res)