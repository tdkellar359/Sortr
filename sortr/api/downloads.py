import flask
import sortr
import os


@sortr.app.route('/api/v1/downloads/<path:subpath>')
def download_file(subpath):
    file_path = os.path.join(
        sortr.app.config["DIRECTORY_ROOT"],
        subpath
    )

    if not os.path.exists(file_path) or not os.path.isfile(file_path):
        return flask.abort(400)

    directory = os.path.join(
        sortr.app.config["DIRECTORY_ROOT"],
        os.path.dirname(subpath)
    )

    filename = os.path.basename(subpath)

    return flask.send_from_directory(
        directory,
        filename
    )