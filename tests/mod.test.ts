import { assertEquals, assertNotEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("sample type1 testing", () => {

})

Deno.test({
    name: "Sample type2 testing",
    fn() {
        assertEquals("node", "node");
        assertNotEquals({
            runtime: "deno",
        }, {
            runtime: "node",
        })
    }
});

Deno.test({
    name: "ops leak",
    sanitizeOps: false,
    fn() {
        setTimeout(console.log, 10000);
    }
});