import flask 

app = flask.Flask(__name__)

app.config.from_object('sortr.config')
app.config.from_envvar('SORTR_SETTINGS', silent=True)

import sortr.views
import sortr.api
import sortr.model
import sortr.data_access