package by.yanovich.photoPortal.servlet;

import by.yanovich.photoPortal.service.Impl.PostServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/like")
public class LikeServlet extends HttpServlet {
    private PostServiceImpl collection = new PostServiceImpl();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int id = Integer.parseInt(request.getParameter("id"));
        String user = request.getParameter("user");
        if (collection.isHasUserLike(id, user)) {
            collection.removeLike(id, user);
            response.getOutputStream().println("like is removed");
        } else {
            collection.addLike(id, user);
            response.getOutputStream().println("like is added");

        }
    }
}
