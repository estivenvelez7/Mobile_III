<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Home extends CI_Controller
{

    public function index()
    {
        echo "I´ts Ok";
    }

    public function addUser()
    {
        $method = $_SERVER['REQUEST_METHOD'];

        if ($method === 'POST') {
            $json = file_get_contents('php://input');
            $data = json_decode($json);

            if (empty($data->name && $data->lastname && $data->document && $data->birthday && $data->city && $data->neighborhood && $data->numberphone)) {
                $response = array("Status" => False, 'Data' => [], 'Error' => 'There are empty fields !!');
                echo json_encode($response);
            } else {
                if (!is_numeric($data->document)) {
                    $response = array("Status" => false, 'Error' => "Error in the field Document");
                    echo json_encode($response);
                } else {
                    if (!is_numeric($data->numberphone) && $data->numberphone < 10) {
                        $response = array("Status" => false, 'Error' => "Error in the format numberphone");
                        echo json_encode($response);
                    } else {
                        $this->Conection_Model->addUser($data);
                        header('content-type: aplication/json');
                        $response = array("Status" => True, 'Message' => 'The person was successfully added');
                        echo json_encode($response);
                    }
                }
            }
        } else {
            header('content-type: aplication/json');
            $response = array('response' => 'Fatal Error!!');
            echo json_encode($response);
        }
    }

    public function getUsers()
    {   
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method === 'GET') {
            $json = file_get_contents('php://input');
            $data = json_decode($json);

            if (empty($this->Conection_Model->getUsers($data))) {
                header('content-type: aplication/json');
                $response = array("Status" => False, 'Error' => "There are no users");
                echo json_encode($response);
            }else{
                $users = $this->Conection_Model->getUsers($data);
                $response = array('Users' => $users, "Status" => True);
                echo json_encode($response);
            }
        } else {
            $response = array("Fatal Error!!");
            echo json_encode($response);
        }
    }

    public function editUser()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method === 'PUT') {
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $this->Conection_Model->editUser($data);
            header('content-type: aplication/json');
            $response = array('response' => 'The user was edited');
            echo json_encode($response);
        } else {
            header('content-type: aplication/json');
            $response = array('response' => 'Could not edit user');
            echo json_encode($response);
        }
    }

    public function deleteUser()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method === 'DELETE') {
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $this->Conection_Model->deleteUser($data);
            header('content-type: aplication/json');
            $response = array('response' => 'The user was deleted');
            echo json_encode($response);
        } else {
            header('content-type: aplication/json');
            $response = array('response' => 'Could not remove the user');
            echo json_encode($response);
        }
    }
}
