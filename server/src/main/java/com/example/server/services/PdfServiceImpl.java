package com.example.server.services;

import com.example.server.models.Claims;
import com.example.server.models.Donation;
import com.example.server.models.Donor;
import com.example.server.models.Ngo;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class PdfServiceImpl implements PdfService {

       @Override
        public ByteArrayInputStream generateCerti(Claims claim) {
           Donation donation = claim.getDonation();
           Ngo ngo = donation.getNgo();
           Donor donor = donation.getDonor();
            Document doc = new Document();
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter.getInstance(doc, out);

            doc.open();

            Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

            font.setSize(25);
            Paragraph title = new Paragraph("Tax Deduction Certificate", new Font(font));
            title.add(new Chunk("\n"));

            font.setSize(30);
            title.add(new Chunk("By", font));
            title.add(new Chunk(ngo.getNgoname(), font));
            title.add(new Chunk("\n"));
            title.add(new Chunk("\n"));

            font.setSize(40);
            title.add(new Paragraph(donor.getName(), font));

            title.setAlignment(Element.ALIGN_CENTER);
            doc.add(title);



            doc.close();


            return new ByteArrayInputStream(out.toByteArray());

        }
        @Override
    public MultiValueMap<String, Object> convertToMultipart(ByteArrayInputStream inputStream) {
        // Create a ByteArrayResource from the ByteArrayInputStream
        ByteArrayResource resource = new ByteArrayResource(inputStream.readAllBytes());

        // Set the headers and create a MultiValueMap containing the multipart file
        org.springframework.http.HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.setContentDispositionFormData("file", "document.pdf");

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", resource);

        // Return the MultiValueMap
        return body;
    }

}
