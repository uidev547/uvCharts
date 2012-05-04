describe('GraphObject', function () {	
	var testGraph = new r3.graph();	
	it('should have the default properties right after construction', function () {
		expect(testGraph.graphdef).toBeUndefined();
		expect(testGraph.config).toEqual(r3.config);
	});
});