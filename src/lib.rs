#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;
use ziyy_core::try_style;

#[napi]
pub fn style(source: String) -> napi::Result<String> {
    let output = match try_style(source) {
        Ok(v) => v,
        Err(e) => return Err(napi::Error::from_reason(e.to_string())),
    };

    Ok(output)
}
