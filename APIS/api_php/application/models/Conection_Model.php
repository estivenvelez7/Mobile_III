<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Conection_Model extends CI_Model{

    public function addUser($users){
        $this->db->insert("users", $users);
    }

    public function getUsers()
    {
        $response = $this->db->query("SELECT * FROM users")->result();
        return $response;

    }

    public function editUser($users)
    {
        $name = $users->name;
        $lastname = $users->lastname;
        $document = $users->document;
        $birthday = $users->birthday;
        $city = $users->city;
        $neighborhood = $users->neighborhood;
        $numberphone = $users ->numberphone;
        $id = $users->id;
        $response = $this->db->query("UPDATE users SET name = '${name}', lastname='${lastname}', document='${document}', birthday='${birthday}', city='${city}', neighborhood='${neighborhood}', numberphone ='${numberphone}' WHERE id= ${id}");
        return $response;
    }

    public function deleteUser($id)
    {
        $response = $this->db->query("DELETE FROM users WHERE id = {$id->id}");
        return $response;
    }


}