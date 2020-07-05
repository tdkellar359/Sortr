import os

APPLICATION_ROOT = '/'

SECRET_KEY = b'V3\xc5\x03\x0e\xfc4\xd10jt\x1a\xe0\x1eI)\\iZ_\x98p<\xd2'

SESSION_COOKIE_NAME = 'sortr_login'

ALLOWED_EXTENSIONS = ['*']

DATABASE_FILENAME = os.path.join(
    os.path.dirname(os.path.dirname(os.path.realpath(__file__))),
    'var',
    'sortr.sqlite3'
)
