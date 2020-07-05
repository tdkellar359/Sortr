import flask
import sortr


@sortr.app.route('/', defaults={'path': ''}, methods=['GET'])
@sortr.app.errorhandler(404)
def show_index_page(path):
    return flask.render_template("index.html")
