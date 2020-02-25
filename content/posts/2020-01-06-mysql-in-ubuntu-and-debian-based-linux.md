---
date: 2020-01-06
title: "MySQL in Ubuntu and Debian-based Linux"
template: post
thumbnail: "../thumbnails/grunt.png"
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

This will install MySQL from software repositories managed by Ubuntu (or Debian if your OS is Debian), you can see a list of repositories that checks for software packages and their updates in `/etc/apt/sources.list`.

### Starter Commands

- `systemctl status mysql.service` - to check the status of mysql server

- `mysql -u root -p` - to open a mysql shell as the root user, the password you set while installation should be used, if you were not prompted to set any password while installation, you could open a mysql shell using your root account by `sudo mysql`

- `mysql -u <user> -p` - to open a mysql shell as <user> (this user must exist, you most likely have to create this user), you will be prompted to enter the password of the user

### After entering the mysql shell, you can use the following commands

1. `SELECT USER();` or `CURRENT_USER();` - to see the user you are logged in as in mysql

2. `SHOW GRANTS;` - to see permissions

3. `SELECT User from mysql.user;` - to see all the users

4. `SHOW DATABASES` - to see all the databases on the mysql server host:

5. To see all the tables in a database, switch to a database by `USE <database-name>` then `SHOW TABLES;`

6. To see current database - `SELECT DATABASE();`

7. To see all the columns in a table - `DESCRIBE <table-name> or SHOW COLMUNS FROM <table-name>`

8. To check if mysql is running - `sudo systemctl status mysql or sudo service mysql status`

9. To stop mysql server - `sudo service mysql stop`

10. To start mysql server - `sudo service mysql start`
