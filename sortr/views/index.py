import flask
import sortr


@sortr.app.route('/', defaults={'path': ''}, methods=['GET'])
@sortr.app.route('/<path:path>', methods=['GET'])
def show_index_page(path):
    return flask.render_template("index.html")
