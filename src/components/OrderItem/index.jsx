const OrderItem = (props) => {
  return (
    <div className="rounded-xl bg-white px-4 py-2 shadow-md">
      <h3 className="px-2 py-3 border-b border-solid border-green font-semibold">Order#{props?.index}</h3>
      <div>
        {
          props?.cart?.item_book?.map((book, id) =>
          (
            <div className="px-2 py-4 border-b border-solid border-green flex justify-start items-start" key={id}>
              <img src={`${book?.book?.image}`} alt="" className="w-1/3" />
              <div className="px-2 w-2/3">
                <h3 className="font-semibold">{book?.book?.title}</h3>
                <div className="flex justify-between items-center text-xs">
                  <span>{book?.price} VNĐ</span>
                  <span>SL: {book?.quantity}</span>
                </div>
              </div>
            </div>
          )
          )
        }
      </div>
      <div className="py-4">
        <span className="font-semibold">Tổng: {props?.cart?.total} VNĐ</span>
      </div>
    </div>
  )
}
export default OrderItem