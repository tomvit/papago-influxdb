while IFS=, read -r col1 col2 col3 col4 col5 col6 col7 col8
do
    epochs=$(date --date="$col1" +%s)
    d="papago_rzv,device=kotel value=$col5 $epochs
papago_rzv,device=boiler value=$col6 $epochs
papago_rzv,device=rack value=$col7 $epochs"
    
    curl -XPOST "http://localhost:8086/write?db=homeautom&precision=s" --data-binary "$d"

    echo "$col1 record inserted"

done < data.csv
