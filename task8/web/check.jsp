<%--
  Created by IntelliJ IDEA.
  User: yanov
  Date: 29/04/2019
  Time: 17:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Check</title>
</head>
<body>
<%
    boolean success = false;
    if(response.getStatus() == 200)
        success = true;
%>
<%= "{ 'success' : " + success + " }" %>
</body>
</html>
