namespace AppSales.WebApi.DTOs
{
    #region requests
    public record CreateSaleRequest(string customerName, int paymetTypeValue, decimal total, IEnumerable<CreateSaleDetailRequest> details);
    public record CreateSaleDetailRequest(string productName, int quantity, decimal unitPrice);
    public record GetSalesQueryRequest(int page, int pageSize);
    #endregion

    #region responses
    public record GetSaleResponse(int saleId, string customerName, string paymetTypeName, decimal total, string saleDate, IEnumerable<GetSaleDetailResponse>? details = null);
    public record GetSaleDetailResponse(string productName, int quantity, decimal unitPrice);
    public record GetSalesQueryResponse(List<GetSaleResponse> items, int page, int pageSize, int totalItems);
    #endregion
}
