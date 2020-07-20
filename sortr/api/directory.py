import flask
import sortr
import os
import base64
import binascii


def directory_common(directory_item_type, parent_directory_b64):
    res = {
        "url": flask.request.path,
        "results": [],
        "next": "",
        "message": "success"
    }

    if 'login' not in flask.session:
        res['message'] = 'unauthorized'
        return flask.jsonify(**res), 403

    username = flask.session['login']['username']

    try:
        subpath = base64.urlsafe_b64decode(parent_directory_b64).decode('utf-8')
        print(subpath)
        parent_directory = subpath.replace("home", username, 1)
    except binascii.Error as err:
        res["message"] = "The file path was not specified correctly."
        return flask.jsonify(**res), 400

    try:
        res["results"] = sortr.data_access.get_directory_items(directory_item_type, parent_directory)
    except Exception as err:
        res["message"] = str(err)
        return flask.jsonify(**res), 404

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
@sortr.app.route('/api/v1/directory/folders/<path:parent_directory_b64>')
def get_folders(parent_directory_b64):
    return directory_common('folder', parent_directory_b64)


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
@sortr.app.route('/api/v1/directory/files/<path:parent_directory_b64>')
def get_files(parent_directory_b64):
    return directory_common('file', parent_directory_b64)