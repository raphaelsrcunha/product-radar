package com.rsc.product_radar.domain.user;

import com.rsc.product_radar.domain.ExceptionValidation;
import com.rsc.product_radar.dto.LoginRequestDTO;
import com.rsc.product_radar.dto.ResponseDTO;
import com.rsc.product_radar.infra.security.TokenService;
import com.rsc.product_radar.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public ResponseDTO login(LoginRequestDTO body) {

        User user = this.userRepository.findByEmail(body.email()).orElseThrow(() -> new ExceptionValidation("User not found"));

        if(!passwordEncoder.matches(body.password(), user.getPassword())) {
            throw new ExceptionValidation("Password is wrong");
        }

        String token = this.tokenService.generateToken(user);
        ResponseDTO responseDTO = new ResponseDTO(user.getEmail(), user.getName(), token);

        return responseDTO;

    }

}
