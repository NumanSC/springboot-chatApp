package com.socu.loginjwt.ws;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Message, Long> {

    Iterable<Message> findBySenderAndReceiver(String sender, String receiver);

    // @Query("SELECT m.sender, m.receiver AS balik_receiver, m.message FROM Message
    // m ")

    List<MessageResponse> findBySenderOrReceiver(String sender, String receiver);

}
