-- Create an admin user

INSERT INTO Users(
    Username,
    Email,
    Filename,
    PasswordHash
)
VALUES (
    'admin',
    'example@email.com',
    NULL,
    'sha512$2d1e01b19b1d403bbb0cf1b558671d7f$9a96758aeb22415ebf1521da88b4688c8437d5d384f596164e8dc403246b759166189e6528b512883af49ddd3ae448e117016dfa630ddf914d6b66e1ff97ce44'-- 'admin_p@ssword'
);