package by.yanovich.photoPortal.service;

import by.yanovich.photoPortal.entity.PhotoPost;

import java.util.List;
import java.util.Map;

public interface PostService {
        List<PhotoPost> getPhotoPosts(int skip, int top, Map<String, String> filter);
        PhotoPost getPhotoPost(int id);
        boolean validatePhotoPost(PhotoPost post);
        boolean addPhotoPost(PhotoPost post);
        boolean editPhotoPost(int id, PhotoPost post);
        boolean removePhotoPost(int id);
}
