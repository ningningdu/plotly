
async function select_and_plot(value) {
    // read in json file- route is relavant to index.html
    var data = await d3.json("data/samples.json");
    // var data = await d3.json("https://raw.githubusercontent.com/ningningdu/plotly/master/samples.json");

    console.log(data)
    // create drop down menu with d3
    var names= data.names
    var dropdown= d3.select("#selDataset");
    // console.log(dropdown)
    names.forEach(name => dropdownoptions = dropdown.append("option").attr("value",name).text(name))

    var selected_data = data.samples.filter(x => x.id === value);
    var selected_metadata = data.metadata.filter(x => x.id === +value);
    selected_metadata=selected_metadata[0]
    // console.log(selected_data);
    console.log(selected_metadata);
    // var v = d3.select("#selDataset").property("value")
    // console.log(v)
    // console.log(d3.select("#selDataset").node().value)

    var otu_ids = selected_data.map(x => x.otu_ids);
    var sample_values = selected_data.map(x => x.sample_values);
    var otu_labels = selected_data.map(x =>x.otu_labels);
    otu_ids = otu_ids[0]
    sample_values=sample_values[0]
    otu_labels=otu_labels[0]
    otu_ids_top10=otu_ids.slice(0,10).map(String)
    otu_ids_top10= otu_ids.map(x => "OTU " +x)
    sample_values_top10=sample_values.slice(0,10)
    otu_labels_top10= otu_labels.slice(0,10)
    
    // console.log (otu_ids);
    // console.log(sample_values)
    // console.log(otu_labels)

    // Sort the data by Greek search results
    // var sorted = selected_data.sort((a, b) => b.sample_values[0] - a.sample_values[0]);
    // console.log(sorted)
    // Slice the first 10 objects for plotting
    // slicedData = sortedByGreekSearch.slice(0, 10);

    // Reverse the array to accommodate Plotly's defaults
    // reversedData = slicedData.reverse();

    //  Create the Traces
    var trace1 = {
      y: otu_ids_top10,
      x: sample_values_top10,
      orientation: 'h',
      type: "bar",
      text: otu_labels_top10,
      name: "Navel Bacteria"
    };
    console.log(trace1);
    // Create the data array for the plot
    var plotdata = [trace1];
  
    // Define the plot layout
    var layout = {
      title: "Top 10 OTUs",
      xaxis: { title: "OTU_IDs" },
      yaxis: { title: "Sample Values" }
    };
  
    Plotly.newPlot("bar", plotdata,layout);

    //Create bubble chart
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        // opacity: [1, 0.8, 0.6, 0.4],
        size:sample_values
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'OTU bubble chart',
      showlegend: false
      // height: 600,
      // width: 600
    };
    
    Plotly.newPlot('bubble', data, layout);
    //display metadata
    d3.select("#sample-metadata").text("")
    d3.select("#sample-metadata").append("p").text(`id: ${selected_metadata.id}`)
    d3.select("#sample-metadata").append("p").text(`ethinicity: ${selected_metadata.ethinicity}`)
    d3.select("#sample-metadata").append("p").text(`gender: ${selected_metadata.gender}`)
    d3.select("#sample-metadata").append("p").text(`age: ${selected_metadata.age}`)
    d3.select("#sample-metadata").append("p").text(`location: ${selected_metadata.location}`)
    d3.select("#sample-metadata").append("p").text(`bbtype: ${selected_metadata.bbtype}`)
    d3.select("#sample-metadata").append("p").text(`wfreq: ${selected_metadata.wfreq}`)
  }

select_and_plot("940");

function optionChanged(value) {
    console.log(value)
    select_and_plot(value)
}

