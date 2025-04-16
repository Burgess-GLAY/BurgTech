<?php

class PHP_Email_Form {
    public $to = '';
    public $from_name = '';
    public $from_email = '';
    public $subject = '';
    public $messages = array();
    public $smtp = array();
    public $ajax = false;

    public function add_message($content, $label = '', $priority = 0) {
        $this->messages[] = array('label' => $label, 'content' => $content, 'priority' => $priority);
    }

    public function send() {
        if (empty($this->to)) {
            return 'Error: Receiving email address is not set!';
        }

        if (empty($this->from_email) || !filter_var($this->from_email, FILTER_VALIDATE_EMAIL)) {
            return 'Error: Invalid sender email!';
        }

        if (empty($this->subject)) {
            return 'Error: Subject is required!';
        }

        if (empty($this->messages)) {
            return 'Error: Message content is missing!';
        }

        // Construct email content
        $email_content = "You have received a new message:\n\n";
        foreach ($this->messages as $message) {
            $email_content .= "{$message['label']}: {$message['content']}\n";
        }

        // Construct email headers
        $headers = "From: {$this->from_name} <{$this->from_email}>\r\n";
        $headers .= "Reply-To: {$this->from_email}\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        // Send via SMTP if configured
        if (!empty($this->smtp)) {
            return $this->send_smtp($email_content);
        }

        // Send email using PHP mail()
        if (mail($this->to, $this->subject, $email_content, $headers)) {
            return 'OK';
        } else {
            return 'Error: Email could not be sent.';
        }
    }

    private function send_smtp($email_content) {
        require 'PHPMailer/PHPMailer.php';
        require 'PHPMailer/Exception.php';
        require 'PHPMailer/SMTP.php';

        $mail = new PHPMailer\PHPMailer\PHPMailer();
        try {
            $mail->isSMTP();
            $mail->Host = $this->smtp['host'];
            $mail->SMTPAuth = true;
            $mail->Username = $this->smtp['username'];
            $mail->Password = $this->smtp['password'];
            $mail->SMTPSecure = 'tls';
            $mail->Port = $this->smtp['port'];

            $mail->setFrom($this->from_email, $this->from_name);
            $mail->addAddress($this->to);
            $mail->Subject = $this->subject;
            $mail->Body = $email_content;

            if ($mail->send()) {
                return 'OK';
            } else {
                return 'Error: ' . $mail->ErrorInfo;
            }
        } catch (Exception $e) {
            return 'Error: ' . $mail->ErrorInfo;
        }
    }
}

?>
