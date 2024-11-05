package com.rsc.product_radar.controller;

import com.rsc.product_radar.domain.user.User;
import com.rsc.product_radar.domain.user.UserService;
import com.rsc.product_radar.dto.LoginRequestDTO;
import com.rsc.product_radar.dto.RegisterRequestDTO;
import com.rsc.product_radar.dto.ResponseDTO;
import com.rsc.product_radar.infra.security.TokenService;
import com.rsc.product_radar.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
public class AuthController {

    private final UserRepository userRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body) {

        ResponseDTO responseDTO = this.userService.login(body);

        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body) {

        Optional<User> user = this.userRepository.findByEmail(body.email());
        if(user.isEmpty()){
            User newUser = new User();
            newUser.setPassword(passwordEncoder.encode(body.password()));
            newUser.setEmail(body.email());
            newUser.setName(body.name());
            this.userRepository.save(newUser);

            String token = this.tokenService.generateToken(newUser);
            return ResponseEntity.ok(new ResponseDTO(newUser.getEmail(), newUser.getName(), token));
        }
        return ResponseEntity.badRequest().build();
    }

}
