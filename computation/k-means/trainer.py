import os

import pandas as pd
import numpy as np
import sys
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.cluster import KMeans
import warnings
import json 

def warn(*args, **kwargs):
    pass
import warnings
warnings.warn = warn

def run(total, rent, country=None):
    if (country!="none"):
        
        root_dir = os.path.abspath(os.path.join(os.getcwd(), ".."))
        # data = pd.read_csv(root_dir+"/Countries/cost-of-living.csv")
        data = pd.read_csv(root_dir+"app/computation/Countries/cost-of-living.csv")
        data = data.loc[data['Country'] == country.capitalize()]
        for x in data.index:
            if isinstance(data.loc[x, "Total($)"], str):
                data.drop(x, inplace=False)

        data["Total($)"] = pd.to_numeric(data["Total($)"], errors='coerce')
        data.dropna(subset=["Total($)"], inplace=True)
        scaler = StandardScaler()
        imputer = SimpleImputer(strategy="mean")

        data[["Total($)","Rent($)"]] = imputer.fit_transform(data[["Total($)","Rent($)"]])
        # data["Total_T"] = scaler.fit_transform(data[["Total($)"]])
        data["Total_T"] = scaler.fit_transform(data[["Total($)"]])
        data["Rent_T"] = scaler.fit_transform(data[["Rent($)"]])

        kmeans = KMeans(n_clusters=4)
        kmeans.fit(data[["Total_T","Rent_T"]])
        data['kmeans_3'] = kmeans.labels_

        def predict(total, rent ):
            # create a new dataframe with the input values
            user_input = pd.DataFrame({'Total($)': [total],'Rent($)': [rent]})

            # scale the input values using the scaler object
            user_input[["Total($)","Rent($)"]] = imputer.transform(user_input[["Total($)","Rent($)"]])
            user_input["Total_T"] = scaler.transform(user_input[["Total($)"]])
            user_input["Rent_T"] = scaler.transform(user_input[["Rent($)"]])

            # predict the cluster label for the new data
            predicted_cluster = kmeans.predict(user_input[["Total_T","Rent_T"]])
            # print(f"The input values belong to cluster: {predicted_cluster[0]}")
            return predicted_cluster[0]

        cluster = predict(total, rent)
        answers = data.loc[data['kmeans_3'] == cluster]
        answers = answers.sort_values("Total($)")

        answers = list(zip(answers["Country"], answers["City"], answers["Total($)"], answers["Rent($)"], answers["Quality of Life"]))
        # plt.scatter(x=data["Total($)"],y=data["Rent($)"], c=data['kmeans_3'])
        # max = data["Total($)"].max()
        # plt.xlim(data["Total($)"].min(), data["Total($)"].max())
        # plt.ylim(data["Rent($)"].min(), data["Rent($)"].max())
        # plt.show()
        result = [{"Country": answer[0], "City": answer[1], "Col": answer[2], "Rent": answer[3], "QOL": answer[4]} for answer in answers]
        print(json.dumps(result))

    else:
        root_dir = os.path.abspath(os.path.join(os.getcwd(), ".."))
        data = pd.read_csv(root_dir+"app/computation/Countries/cost-of-living.csv")
        for x in data.index:
            if isinstance(data.loc[x, "Total($)"], str):
                data.drop(x, inplace=False)

        data["Total($)"] = pd.to_numeric(data["Total($)"], errors='coerce')
        data.dropna(subset=["Total($)"], inplace=True)
        scaler = StandardScaler()
        imputer = SimpleImputer(strategy="mean")

        data[["Total($)","Rent($)"]] = imputer.fit_transform(data[["Total($)","Rent($)"]])
        # data["Total_T"] = scaler.fit_transform(data[["Total($)"]])
        data["Total_T"] = scaler.fit_transform(data[["Total($)"]])
        data["Rent_T"] = scaler.fit_transform(data[["Rent($)"]])

        kmeans = KMeans(n_clusters=9)
        kmeans.fit(data[["Total_T","Rent_T"]])
        data['kmeans_3'] = kmeans.labels_

        def predict(total, rent ):
            # create a new dataframe with the input values
            user_input = pd.DataFrame({'Total($)': [total],'Rent($)': [rent]})

            # scale the input values using the scaler object
            user_input[["Total($)","Rent($)"]] = imputer.transform(user_input[["Total($)","Rent($)"]])
            user_input["Total_T"] = scaler.transform(user_input[["Total($)"]])
            user_input["Rent_T"] = scaler.transform(user_input[["Rent($)"]])

            # predict the cluster label for the new data
            predicted_cluster = kmeans.predict(user_input[["Total_T","Rent_T"]])
            # print(f"The input values belong to cluster: {predicted_cluster[0]}")
            return predicted_cluster[0]

        cluster = predict(total, rent)
        answers = data.loc[data['kmeans_3'] == cluster]
        answers = answers.sort_values("Total($)")

        answers = list(zip(answers["Country"], answers["City"], answers["Total($)"], answers["Rent($)"], answers["Quality of Life"]))
        # plt.scatter(x=data["Total($)"],y=data["Rent($)"], c=data['kmeans_3'])
        # max = data["Total($)"].max()
        # plt.xlim(data["Total($)"].min(), data["Total($)"].max())
        # plt.ylim(data["Rent($)"].min(), data["Rent($)"].max())
        # plt.show()
        result = [{"Country": answer[0], "City": answer[1], "Col": answer[2], "Rent": answer[3], "QOL": answer[4]} for answer in answers]
        print(json.dumps(result))

       

if __name__ == "__main__":
    run(int(sys.argv[1]),int(sys.argv[2]),sys.argv[3])