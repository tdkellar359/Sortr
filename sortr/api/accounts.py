import flask
import sortr


@sortr.app.route('/api/v1/accounts/create', methods=['POST'])
def create_account():
    pass


@sortr.app.route('/api/v1/accounts/login', methods=['POST'])
def login():
    pass


@sortr.app.route('/api/v1/accounts/authenticate', methods=['GET'])
def authenticate():
    pass