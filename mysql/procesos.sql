CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_aulas`()
BEGIN
    SELECT 
        ambientes.id,
        ambientes.nombre AS nombre, 
        ambientes.capacidad,
        ambientes.descripcion,
        ambientes.habilitado,
        tipos_ambientes.nombre AS tipo,
        GROUP_CONCAT(facilidades.nombre) AS facilidades
    FROM ambientes
    JOIN tipos_ambientes ON ambientes.tipos_ambientes_id = tipos_ambientes.id
    LEFT JOIN facilidades_ambientes ON ambientes.id = facilidades_ambientes.ambientes_id
    LEFT JOIN facilidades ON facilidades_ambientes.facilidades_id = facilidades.id
    GROUP BY ambientes.id;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `agregar_ambiente`(IN nombre_amb VARCHAR(45), IN descripcion_amb TEXT, IN capacidad_amb INT, IN tipo_id INT, IN habilitado_amb INT)
BEGIN
    INSERT INTO ambientes (nombre, descripcion, capacidad, activo, tipos_ambientes_id, habilitado)
    VALUES (nombre_amb, descripcion_amb, capacidad_amb, 1, tipo_id, habilitado_amb);
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_ambiente`(IN ambiente_id INT)
BEGIN
    UPDATE ambientes SET activo = 0 WHERE id = ambiente_id;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `iniciar_sesion`(IN user_nombre VARCHAR(15), IN user_pass VARCHAR(20))
BEGIN
    SELECT id FROM usuarios WHERE nombre = user_nombre AND contraseña = user_pass;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerFacilidadesAmbiente`(IN ambiente_id INT)
BEGIN
    SELECT f.nombre, f.descripcion
    FROM facilidades f
    JOIN ambiente_facilidades af ON f.id = af.facilidades_id
    WHERE af.ambiente_id = ambiente_id;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerTipoAmbiente`(IN ambiente_id INT)
BEGIN
    SELECT ta.nombre, ta.descripcion
    FROM tipos_ambiente ta
    JOIN ambientes a ON ta.id = a.tipo_id
    WHERE a.id = ambiente_id;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `periodos_disponibles`(IN ambiente_id INT, IN fecha_res DATE)
BEGIN
    -- Seleccionamos todos los periodos que no están reservados para el ambiente y fecha indicados.
    SELECT p.id, p.inicio, p.fin
    FROM periodos p
    WHERE NOT EXISTS (
        SELECT 1
        FROM reservas r
        WHERE r.ambientes_id = ambiente_id AND r.fecha = fecha_res AND r.periodos_id = p.id
    );
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `recuperar_ambientes_por_cantidad`(IN min_capacidad INT)
BEGIN
    SELECT * FROM ambientes WHERE capacidad >= min_capacidad AND activo = 1;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `recuperar_ambientes_por_facilidad`(IN facilidad_id INT)
BEGIN
    SELECT a.*
    FROM ambientes a
    JOIN facilidades_ambientes fa ON a.id = fa.ambientes_id
    WHERE fa.facilidades_id = facilidad_id AND a.activo = 1;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `recuperar_ambientes_por_fecha`(IN fecha_reserva DATE)
BEGIN
    SELECT a.*
    FROM ambientes a
    WHERE a.activo = 1 AND NOT EXISTS (
        SELECT 1
        FROM reservas r
        WHERE r.ambientes_id = a.id AND r.fecha = fecha_reserva
    );
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `reservar_ambiente`(IN ambiente_id INT, IN fecha_res DATE, IN periodo_id INT, IN asunto_reserva TEXT)
BEGIN
    INSERT INTO reservas (asunto, fecha, ambientes_id, usuarios_id, periodos_id)
    VALUES (asunto_reserva, fecha_res, ambiente_id, 1, periodo_id); -- El `1` es un valor dummy. Deberías pasar el id del usuario que está haciendo la reserva.
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `set_habilitado_ambiente`(IN ambiente_id INT, IN habilitado_amb INT)
BEGIN
    UPDATE ambientes SET habilitado = habilitado_amb WHERE id = ambiente_id;
END