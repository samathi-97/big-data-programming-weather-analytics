# Sri Lanka Weather Analytics System (2010 – June 2024)
Big Data Programming Assessment – CMM705

This repository contains the implementation of a big data analytics solution for Sri Lankan weather data using Hadoop, Hive, Spark, and Spark MLlib.

---

## Task 1 – Big Data Solution Architecture

- Designed a scalable big data architecture to process large-scale weather data
- Supports batch processing and analytical workloads
- Integrated multiple big data technologies into a single pipeline
- Technologies used:
  - HDFS for distributed storage
  - Hadoop MapReduce for batch analytics
  - Hive for SQL-based data analysis
  - Apache Spark for in-memory processing
  - Spark MLlib for predictive modeling
  - Static web dashboard for result visualization

---

## Task 2A – Hadoop MapReduce

- Implemented MapReduce programs to analyze historical weather data
- Calculated monthly total precipitation and average temperature per district for the past 10 years
- Identified the month and year with the highest total precipitation in the dataset
- Used custom Mapper, Reducer, and Driver classes
- Input data stored in HDFS and outputs written back to HDFS

---

## Task 2B – Hive Analytics (Docker)

- Used Apache Hive running in a Docker container for SQL-based analytics
- Created external tables for weather and location datasets
- Identified the top 10 most temperate cities
- Calculated average evapotranspiration by season:
  - MAHA season (September – March)
  - YALA season (April – August)
- Used HiveQL with joins, aggregations, and conditional logic

---

## Task 2C – Apache Spark (PySpark)

- Performed large-scale data analysis using Apache Spark
- Loaded and processed CSV data using PySpark DataFrames
- Calculated the percentage of total monthly shortwave radiation from days exceeding 15 MJ/m²
- Determined weekly maximum temperatures for the hottest months of each year
- Leveraged Spark’s in-memory processing for improved performance

---

## Task 3 – Spark MLlib

- Implemented machine learning models using Spark MLlib
- Prepared and cleaned data for model training
- Selected relevant features:
  - precipitation_hours
  - sunshine
  - wind_speed
- Applied an 80/20 train-test split
- Trained and evaluated multiple models:
  - Linear Regression
  - Decision Tree
  - Random Forest
- Selected the best-performing model based on RMSE
- Used the model to predict weather conditions leading to low evapotranspiration in May 2026

---

## Task 4 – Static Dashboard

- Developed a static dashboard to present analytical results
- Visualized key insights from MapReduce, Hive, Spark, and ML outputs
- Implemented using:
  - HTML for structure
  - CSS for styling
  - JavaScript for interactivity
- Designed for easy interpretation of weather trends and predictions

---


## Task 2A – Hadoop MapReduce (How to Run)

- Start Hadoop services (HDFS and YARN)
- Upload weatherData.csv to HDFS input directory
- Build the MapReduce project using Maven
- Execute the MapReduce JAR files for:
  - Monthly precipitation and average temperature analysis
  - Highest precipitation month and year analysis
- View output files from HDFS output directories

---

## Task 2B – Hive Analytics (Docker) (How to Run)

- Start Apache Hive using a Docker container
- Copy weather and location CSV files into the container
- Create Hive database and external tables using HiveQL scripts
- Execute Hive queries to:
  - Identify top 10 most temperate cities
  - Calculate average evapotranspiration by season
- Review results using Hive query output

---

## Task 2C – Apache Spark (PySpark) (How to Run)

- Open PySpark notebooks located in the Spark notebooks directory
- Run notebooks using Google Colab or a local Spark environment
- Execute all cells sequentially to generate analytical outputs
- Review results displayed within the notebook

---

## Task 3 – Spark MLlib (How to Run)

- Open Spark MLlib notebooks from the ML directory
- Execute data preprocessing and feature engineering steps
- Train models using an 80/20 train-test split
- Evaluate models and select the best-performing one
- Run prediction step for May 2026 evapotranspiration conditions

---

## Task 4 – Static Dashboard (How to Run)

- Navigate to the dashboard directory
- Open the index.html file in a web browser
- Alternatively, start a local HTTP server to view the dashboard
- Review visualizations and insights generated from analysis results

## Author

Samathi Sapumana  
MSc Big Data Analytics  
CMM705 – Big Data Programming
