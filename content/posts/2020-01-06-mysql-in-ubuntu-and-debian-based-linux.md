---
date: 2020-01-06
title: 'MySQL in Ubuntu and Debian-based Linux'
template: post
thumbnail: '../thumbnails/grunt.png'
slug: mysql-in-ubuntu-and-debian-based-linux
categories:
  - Databases
tags:
  - mysql
  - server
  - ubuntu
---

## What is MySQL

MySQL is a software that can add, remove, access, or process data stored in a database. A database is a structured collection of data.

## What is MySQL Server

When you go to the downloads page of MySQL official website you'll find packages named MySQL Server (or MySQL Community Server which is the community edition), MySQL Cluster, MySQL Router, MySQL Shell, MySQL Workbench, etc. Among these, MySQL Server package, as the name suggests, works like a server. You can simply connect to it, and perform actions on the MySQL database that comes included in the package. When we generally say to install MySQL, we mean MySQL Server. It is most often used as a database for storing data relating to some application (say mobile app or website), which most likely has a server on the backend. Now this backend server can fetch the data (like username, id of users of app) from the MySQL Server by connecting to it and making add, delete, access, or modify requests for the data stored and then send the data to the application's forntend.

## How to get started with MySQL on Ubuntu

### Installation

```bash
sudo apt update 
sudo apt install mysql-server
```

This will install MySQL from software repositories managed by Ubuntu (or Debian if your OS is Debian), you can see a list of repositories that checks for software packages and their updates in ```/etc/apt/sources.list```.