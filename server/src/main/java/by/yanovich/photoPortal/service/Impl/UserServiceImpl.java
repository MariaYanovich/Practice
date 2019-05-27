package by.yanovich.photoPortal.service.Impl;

import by.yanovich.photoPortal.entity.User;
import by.yanovich.photoPortal.repository.UsersSingleton;
import by.yanovich.photoPortal.service.UserService;

import java.util.List;


public class UserServiceImpl implements UserService {
    private List<User> users;

    public UserServiceImpl(){
        this.users = UsersSingleton.getInstance().getUsers();
    }
    @Override
    public User loginUser(String login, String password) {
        for(User user : users) {
            if(user.getUserName().equals(login) && user.getPassword().equals(password)) {
                return user;
            }
        }
        return null;
    }

    @Override
    public boolean registerUser(User user) {
        for(User u : users) {
            if (u.getUserName().equals(user.getUserName())) {
                return false;
            }
        }
        return true;
    }

    @Override
    public String hashPassword(String password) {
        return null;
    }

}