import flask
import sortr


@sortr.app.route('/', methods=['GET'])
def show_index_page():
    return flask.render_template("index.html")
