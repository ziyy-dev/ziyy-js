#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;
use ziyy_core::{Parser, Resolver, Splitter};

#[napi]
pub fn style(source: String) -> napi::Result<String> {
    // let mut indexer = Indexer::new();
    // let source = indexer.index(source.as_ref().to_string());
    let mut splitter = Splitter::new();
    #[allow(clippy::unnecessary_to_owned)]
    let frags = match splitter.split(source) {
        Ok(v) => v,
        Err(e) => return Err(napi::Error::from_reason(e.to_string())),
    };

    let parser = Parser::new(false);
    let chunks = match parser.parse(frags) {
        Ok(v) => v,
        Err(e) => return Err(napi::Error::from_reason(e.to_string())),
    };

    let mut resolver = Resolver::new(false);
    let output = match resolver.resolve(chunks) {
        Ok(v) => v,
        Err(e) => return Err(napi::Error::from_reason(e.to_string())),
    };

    let mut buf = String::new();
    output.root().to_string(&mut buf);
    Ok(buf)
}
