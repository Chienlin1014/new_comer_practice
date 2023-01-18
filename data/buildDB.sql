DROP DATABASE IF EXISTS TODO_LIST ;
CREATE DATABASE TODO_LIST;
USE TODO_LIST;

create table todos(
 ID int not null auto_increment primary key,
 todo varchar(20) not null,
 status tinyint default 0 comment '0未完成， 1完成',
 update_time timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
 );


INSERT INTO `todos` (`todo`) VALUES ('吃飯'),('洗澡'),( '睡覺');
