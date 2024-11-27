import os

from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_login import LoginManager


class Base(DeclarativeBase):
    pass


config_dir = os.path.abspath(os.path.dirname(__file__))
base_dir = os.path.join(config_dir, os.path.pardir)
UPLOAD_FOLDER = os.path.join(base_dir, './temp')
app = Flask(__name__)
app.secret_key = os.environ.get('API_SECRET')
db = SQLAlchemy(model_class=Base)
migrate = Migrate(app, db)
f_bcrypt = Bcrypt(app)

login_manager = LoginManager()
login_manager.init_app(app)


CORS(
    app,
    resources={
        r'/*': {
            "origins": ["http://localhost:5173", "https://shadeshift-e05d4.web.app/"]
        }
    },
    supports_credentials=True,
)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(base_dir, 'database.db')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

db.init_app(app)

