<?php

  // Set your YELP keys here
  $consumer_key = "0JSQnaYFm8G0k1vAPB6EQw";
  $consumer_secret = "MzZHH9TNCGzhVxMhkDe3x65YTi4";
  $token = "5sAncdSMLmcPOuHMm5BxWTggYTe_Ye-q";
  $token_secret = "9QDvyPO4D_HpG0MI-SJOQ083SZ0";
  //google api key = AIzaSyBvh_pOblpboBwg2rvid4AhTWRfHi5bPiQ

  require_once ('OAuth.php');
  header("Content-type: application/json\n\n");
  $params = $_SERVER['QUERY_STRING'];
  $unsigned_url = "https://api.yelp.com/v2/search?$params";
  $token = new OAuthToken($token, $token_secret);
  $consumer = new OAuthConsumer($consumer_key, $consumer_secret);
  $signature_method = new OAuthSignatureMethod_HMAC_SHA1();
  $oauthrequest = OAuthRequest::from_consumer_and_token($consumer, $token, 'GET', $unsigned_url);
  $oauthrequest->sign_request($signature_method, $consumer, $token);
  $signed_url = $oauthrequest->to_url();
  $ch = curl_init($signed_url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  $data = curl_exec($ch);
  curl_close($ch);
  print_r($data);

?>
