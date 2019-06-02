package by.yanovich.photoPortal.repository;

import by.yanovich.photoPortal.entity.User;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class UsersSingleton {
    private List<User> users;
    private UsersSingleton() {
        this.users = new ArrayList<>(Arrays.asList(
                new User("Katya", "123"),
                new User("Masha", "qwe"),
                new User("Sasha", "python"),
                new User("Liza", "moto")));
    }
    public List<User> getUsers(){
        return this.users;
    }
    public static class UsersHolder {
        public static final UsersSingleton HOLDER_INSTANCE = new UsersSingleton();
    }

    public static UsersSingleton getInstance() {
        return UsersSingleton.UsersHolder.HOLDER_INSTANCE;
    }
}