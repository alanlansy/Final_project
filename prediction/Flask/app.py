from flask import Flask, render_template, request
from flask import Flask, jsonify,request,json

from wtforms import Form, TextAreaField, validators, FloatField
import pickle
#import sqlite3
from sklearn.externals import joblib
import os
import numpy as np
import pandas as pd



app2 = Flask(__name__)

######## Preparing the Classifier
cur_dir = os.path.dirname(__file__)
clf = joblib.load('xgb_model.pkl')
booster = clf.get_booster()
booster.set_param({'predictor': 'cpu_predictor'})
col_names=joblib.load('col_names.pkl')

def classify(document):
    pkl_file = open('crime_categories.pkl', 'rb')
    crime = pickle.load(pkl_file)
    feat_array=np.zeros(len(col_names))
    feat_array[-3]=document[0]
    feat_array[-2]=document[1]
    feat_array[-1]=document[2]
    h=feat_array.reshape(len(feat_array), 1)
    X=pd.DataFrame(h.T, columns=col_names)
    y = clf.predict(X)
    result=clf.predict_proba(X)
    proba = np.max(result)
    return crime[y[0]], proba


month_list=['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep',
   'Oct', 'Nov', 'Dec']
neighborhood_list=['BAYVIEW', 'CENTRAL', 'INGLESIDE', 'MISSION',
   'NORTHERN', 'PARK', 'RICHMOND', 'SOUTHERN', 'TARAVAL', 'TENDERLOIN']
hour_list=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]

######## Flask

@app2.route('/')
def index():
    return render_template('index.html',hour_list=hour_list)




@app2.route('/results')
def results():
    latitude = request.args['latitude']
    longitude = request.args['longitude']
    print(longitude)
    hour=request.args['hour']
    data=[longitude, latitude, int(hour)]
    y, proba = classify(data)
    return jsonify({'prob':round(proba*100, 2),'cat':y})

        # return render_template('results.html',
        #                         data=data,
        #                         prediction=y,
        #                         probability=round(proba*100, 2))


if __name__ == '__main__':
    app2.run(debug=True)
