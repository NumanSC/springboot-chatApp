package com.socu.loginjwt.web.user;

import java.util.Base64;

public class ImageUtils {
    public static byte[] base64ToBytes(String base64) {
        return Base64.getDecoder().decode(base64);
    }
}
