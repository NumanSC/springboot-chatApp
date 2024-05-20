package com.socu.loginjwt.ws;

import java.util.List;

public record MessageResponse(Long id, String sender, String receiver, String message) {

    public MessageResponse(List<MessageResponse> messages) {
        this(messages.get(0).id(), messages.get(0).sender(), messages.get(0).receiver(), messages.get(0).message());
    }

}
