package com.example.server.services;

import com.example.server.models.Claims;
import org.springframework.util.MultiValueMap;

import java.io.ByteArrayInputStream;

public interface PdfService {
    public ByteArrayInputStream generateCerti(Claims claim);
    public MultiValueMap<String, Object> convertToMultipart(ByteArrayInputStream inputStream);

}
