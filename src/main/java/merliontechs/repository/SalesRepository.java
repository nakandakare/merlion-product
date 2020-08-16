package merliontechs.repository;

import merliontechs.domain.Sales;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.time.Instant;
/**
 * Spring Data  repository for the Sales entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SalesRepository extends JpaRepository<Sales, Long> {

    // Cantidad de ventas en estado DELIVERED por dia.
    @Query(value = "SELECT new map(COUNT(*) AS cantidadVenta, s.date AS fechaVenta) FROM Sales s WHERE s.state = 'DELIVERED' GROUP BY s.date")
    List<?> ventasDeliveredPorDia();

    // Ventas por dia.
    @Query(value = "SELECT new map(COUNT(*) AS cantidadVenta, s.date AS fechaVenta) FROM Sales s GROUP BY s.date ORDER BY s.date")
    List<?> ventasPorDia();

    // Ranking 5 productos mas vendidos.
    @Query(value = "SELECT new map(COUNT(*) AS cantidadVenta, p.name AS nombreProducto, p.id AS productoId) FROM Sales s JOIN s.product p GROUP BY p.id ORDER BY cantidadVenta DESC")
    List<?> productosMasVendidos();

    // Ranking 5 productos con mas ingresos.
    @Query(value = "SELECT new map(SUM(p.price) AS Ingreso, p.name AS nombreProducto, p.id AS productoId) FROM Sales s JOIN s.product p GROUP BY p.id ORDER BY SUM(p.price) DESC")
    List<?> productosMasIngresos();
}
