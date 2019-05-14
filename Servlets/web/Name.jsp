<%--
  Created by IntelliJ IDEA.
  User: Вика
  Date: 29.04.2019
  Time: 20:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title2</title>
</head>
<body>
    <% String name = request.getParameter("name"); %>
    <%= "Name is " + name %>
</body>
</html>
