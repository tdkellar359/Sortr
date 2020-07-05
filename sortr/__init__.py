import flask 

app = flask.Flask(__name__)

app.config.from_object('sortr.config')
app.config.from_envvar('SORTR_SETTINGS', silent=True)

import sortr.api
import sortr.views
import sortr.model