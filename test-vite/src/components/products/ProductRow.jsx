export function ProductRow({ product}) {
  const style = product.stocked ? undefined : {color: 'red'};
  return (
<tr>
    <td style={style} className="border px-4 py-2">{product.name}</td>
    <td className="border px-4 py-2">{product.price}</td>
    <td className="border px-4 py-2">{product.category}</td>


</tr>
  );
}