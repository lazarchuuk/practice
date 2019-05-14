<%--
  Created by IntelliJ IDEA.
  User: Вика
  Date: 29.04.2019
  Time: 20:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title3</title>
</head>
<body>
<%boolean success = false;
    if(response.getStatus() == 200)
        success = true;
%>
<%= "{ 'success' : " + success + " }" %>
</body>
</html>
