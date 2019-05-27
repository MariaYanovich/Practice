package by.yanovich.photoPortal.service;

import by.yanovich.photoPortal.entity.User;

public interface UserService {
    User loginUser(String login, String password);
    boolean registerUser(User user);
    String hashPassword(String password);
}
