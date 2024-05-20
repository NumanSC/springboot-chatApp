package com.socu.loginjwt.messages;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Messages, Long> {

    List<Messages> findBySenderOrReceiver(Long userId, Long userId2);

    // @Query("SELECT m FROM Messages m WHERE m.id = 1 ")
    List<Messages> findBySender(Long sender);

}
