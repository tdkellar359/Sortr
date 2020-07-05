import flask
import sortr
import os


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
@sortr.app.route('/api/v1/directory/folders/<path:subpath>')
def get_folders(subpath):
    user_path = os.path.join(
        sortr.app.config["DIRECTORY_ROOT"],
        subpath
    )

    res = {
        "url": flask.request.path,
        "results": [],
        "next": ""
    }

    try:
        res = [
            { folder, os.path.join(user_path, folder) }
            for folder
            in os.listdir(user_path)
            if os.path.isdir(os.path.join(user_path, folder))
        ]
    except FileNotFoundError as err:
        return flask.abort(400)

    return flask.jsonify(res)


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
@sortr.app.route('/api/v1/directory/files/<path:subpath>')
def get_files(subpath):
    user_path = os.path.join(
        sortr.app.config["DIRECTORY_ROOT"],
        subpath
    )

    try:
        res = [
            file for file in os.listdir(user_path)
            if os.path.isfile(os.path.join(user_path, file))
        ]
    except FileNotFoundError as err:
        return flask.abort(400)

    return flask.jsonify(res)