# Dhaniti Education Lending Application Intelligence Dashboard

## 1. Problem Understanding

Dhaniti needs a lightweight internal tool to view, search, analyze and understand education-loan applications received from students.

The supplied dataset contains synthetic education-loan application records with information about students, institutions, courses, loan amounts, income, credit scores, application dates and application statuses.

The goal of this project is to build a working dashboard that allows an internal team to:

* Monitor application volumes and statuses
* Understand requested loan amounts
* Search and filter applications
* View individual application details
* Create new applications
* Update application status
* Identify useful business insights from the supplied data
* Identify and handle data-quality issues

> **Note:** All data supplied with the assignment is synthetic and is not real customer or underwriting data.

---

## 2. Solution Overview

The application is built as a React frontend connected to a Node.js and Express.js REST API backend.

The supplied CSV dataset is loaded into MongoDB using a seed script.

### Application Flow

```text
CSV Dataset
     ↓
Seed Script
     ↓
MongoDB
     ↓
Node.js + Express REST API
     ↓
React Frontend
     ↓
Dashboard / Applications / Details / Add Application
```

The dashboard dynamically retrieves application data from the backend and calculates KPIs and business insights.

---

## 3. Main Features

### Dashboard

* Total applications
* Approved applications
* Under-review applications
* Rejected applications
* Total loan amount requested
* Applications by status chart
* Applications by course chart
* Applications over time chart
* Business insights
* Data-quality observations

### Application Management

* Search by application ID or student name
* Filter by application status
* Filter by course
* Filter by institution
* Sort by loan amount
* Sort by credit score
* Pagination
* View individual application details
* Update application status
* Create a new application

---

## 4. Technology Stack

### Frontend

* React
* JavaScript
* HTML/JSX
* CSS
* React Router
* Recharts
* Fetch API
* Vite

### Backend

* Node.js
* Express.js
* REST APIs
* Mongoose

### Database

* MongoDB

### Data Loading

* CSV
* csv-parser
* Custom seed script

---
