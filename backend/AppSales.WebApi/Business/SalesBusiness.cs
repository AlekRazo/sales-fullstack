using AppSales.WebApi.Data;
using AppSales.WebApi.Data.Entities;
using AppSales.WebApi.Data.Enums;
using AppSales.WebApi.DTOs;

namespace AppSales.WebApi.Business
{
    public class SalesBusiness (AppDbContext _db)
    {
        public async Task<ApiResponse<int>> CreateAsync(CreateSaleRequest req)
        {
            if (string.IsNullOrEmpty(req.customerName))
                return ApiResponse<int>.Fail("Customer name is required");

            if (Enum.IsDefined(typeof(PaymentType), req.paymetTypeValue))
                return ApiResponse<int>.Fail("Payment type is required");

            var productNameEmpty = req.details.Any(p => string.IsNullOrEmpty(p.productName));

            if (productNameEmpty)
                return ApiResponse<int>.Fail("Product name is required");

            var dbEntity = new Sale()
            {
                CustomerName = req.customerName,
                PaymentType = (PaymentType)req.paymetTypeValue,
                Total = req.total,
                Details = req.details.Select(e => new SaleDetail
                {
                    ProductName = e.productName,
                    Quantity = e.quantity,
                    UnitPrice = e.unitPrice
                })
            };

            await _db.Sales.AddAsync(dbEntity);
            await _db.SaveChangesAsync();

            return ApiResponse<int>.Success(dbEntity.SaleId);
        }
    }
}
