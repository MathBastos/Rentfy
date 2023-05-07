package rentify.security;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import rentify.usuario.entity.Usuario;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.jackson.io.JacksonDeserializer;
import io.jsonwebtoken.jackson.io.JacksonSerializer;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JWT {
    private static final String PREFIX = "Bearer";
    private static final String ISSUER = "Rentify";
    private static final String SECRET = "6x/BE?(X+MQsxeOxPmZq3t2xpH$C&F/x/";
    private static final String USUARIO = "usuario";
    private static final int DIAS = 1;

    private static Date toDate(LocalDate date) {
        return Date.from(date.atStartOfDay(ZoneOffset.UTC).toInstant());
    }

    public String createToken(Usuario usuario) {
        final var now = LocalDate.now();
        final var usuarioToken = new UsuarioToken(
                usuario.getId(),
                usuario.getLogin(),
                usuario.getNome(),
                usuario.getRoles()
        );

        return Jwts.builder()
                .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()))
                .serializeToJsonWith(new JacksonSerializer<>())
                .setIssuedAt(toDate(now))
                .setExpiration(toDate(now.plusDays(DIAS)))
                .setIssuer(ISSUER)
                .setSubject(usuario.getId().toString())
                .addClaims(Map.of(USUARIO, usuarioToken))
                .compact();
    }

    public Authentication extract(HttpServletRequest req) {
        var header = req.getHeader(HttpHeaders.AUTHORIZATION);
        if (header == null || !header.startsWith(PREFIX)) return null;

        var token = header.replace(PREFIX, "").trim();

        var claims = Jwts.parserBuilder()
                .setSigningKey(SECRET.getBytes())
                .deserializeJsonWith(new JacksonDeserializer<>(Map.of(USUARIO, UsuarioToken.class)))
                .build()
                .parseClaimsJws(token)
                .getBody();

        if (!ISSUER.equals(claims.getIssuer())) return null;

        var usuario = claims.get(USUARIO, UsuarioToken.class);
        if (usuario == null) return null;
        var authorities = usuario.getRoles().stream()
                .map(r -> new SimpleGrantedAuthority("ROLE_" + r))
                .toList();
        return UsernamePasswordAuthenticationToken.authenticated(usuario, usuario.getId(), authorities);
    }

}
